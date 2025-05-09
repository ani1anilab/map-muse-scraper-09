
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardHeader, CardContent } from "@/components/ui/card";
import { BarChart, MapPin, Table, Lock } from "lucide-react";
import ResultsTable from "../ResultsTable";
import ResultsAnalyticsView from "./ResultsAnalyticsView";
import ResultsMapView from "./ResultsMapView";
import SearchInfoCard from "../SearchInfoCard";
import ResultsDataHeader from "./ResultsDataHeader";

interface ResultsTabbedContentProps {
  data: any[];
  searchInfo: any;
  totalCount: number;
  isLimited: boolean;
  resultUrl?: string;
  exportCsv: () => void;
  updated_at?: string;
  onShowCsvPreview: () => void;
}

export default function ResultsTabbedContent({
  data,
  searchInfo,
  totalCount,
  isLimited,
  resultUrl,
  exportCsv,
  updated_at,
  onShowCsvPreview
}: ResultsTabbedContentProps) {
  const [activeView, setActiveView] = useState("table");
  
  // Limit data to 5 rows if user has exceeded free tier
  const getLimitedData = () => {
    if (!data) return [];
    
    if (isLimited && Array.isArray(data) && data.length > 5) {
      return data.slice(0, 5);
    }
    
    return data;
  };

  return (
    <>
      <CardHeader>
        <ResultsDataHeader 
          title="Task Results" 
          description={`Showing data for "${searchInfo?.keywords}" (${totalCount} results)`}
          isLimited={isLimited}
          resultUrl={resultUrl}
          onExportCsv={exportCsv}
        />
        
        {isLimited && (
          <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm font-medium mt-2">
            <Lock className="h-3 w-3" />
            <span>Showing limited preview (5 rows)</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeView} onValueChange={setActiveView} className="mb-6">
          <TabsList>
            <TabsTrigger value="table" className="flex items-center gap-1">
              <Table className="h-4 w-4" />
              <span>Table View</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            {searchInfo?.location && (
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Map View</span>
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="table" className="mt-4">
            <ResultsTable 
              data={getLimitedData()} 
              searchInfo={searchInfo}
              totalCount={totalCount}
              isLimited={isLimited}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <ResultsAnalyticsView isLimited={isLimited} />
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <ResultsMapView isLimited={isLimited} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <SearchInfoCard 
            totalCount={totalCount} 
            searchInfo={{
              keywords: searchInfo?.keywords,
              location: searchInfo?.location,
              fields: searchInfo?.fields,
              rating: searchInfo?.rating
            }}
            completedAt={updated_at}
          />
        </div>
      </CardContent>
    </>
  );
}
