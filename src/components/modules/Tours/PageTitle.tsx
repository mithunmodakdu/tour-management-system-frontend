import { Card, CardContent } from "@/components/ui/card";
import type { IPageInfo } from "@/types";

interface IPageTitleProps {
  pageInfo: IPageInfo
}


export default function PageTitle({pageInfo} : IPageTitleProps) {
  // console.log(pageInfo)

  return (
    <Card className="relative overflow-hidden rounded-none shadow-md group">
      {/* Background Image */}
      <img
        src={pageInfo?.pageImage}
        alt={pageInfo?.pageTitle}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300"></div>

      {/* Content */}
      <CardContent className="absolute w-full md:w-3/4  md:left-[15%] bottom-[22%] md:bottom-[25%] lg:bottom-[30%]    p-5 text-center text-white">
        <h3 className="text-xl md:text-2xl font-bold">{pageInfo?.pageTitle} Division</h3>
        <h4 className="text-xl font-semibold">{pageInfo?.pageSubTitle}</h4>
        <p className="text-sm md:text-[16px] opacity-90">{pageInfo?.pageDescription}</p>
      </CardContent>
    </Card>
  );
}