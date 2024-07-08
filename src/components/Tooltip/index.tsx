//imports
import React from "react";
import { Container } from "./styles";

//interface
interface TooltipProps{
  title: string,
  children: React.ReactNode;
  className?: string;
}

//app
export function Tooltip({
  title,
  children,
  className
}: TooltipProps){
  return(
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}