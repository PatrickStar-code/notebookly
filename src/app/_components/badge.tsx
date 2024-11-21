import { Badge } from "@/components/ui/badge";
import React from "react";

type BadgeProps = {
  Fellings: "positive" | "negative" | "neutral";
};

export default function SentimentalBadge(props: BadgeProps) {
  return (
    <>
      {props.Fellings === "positive" && (
        <Badge className="bg-green-400 text-white border hover:bg-green-500  text-md">
          &#x1F600; Feliz
        </Badge>
      )}
      {props.Fellings === "negative" && (
        <Badge variant="outline">&#x1F641; Triste</Badge>
      )}
      {props.Fellings === "neutral" && (
        <Badge variant="outline">&#x1F610; Neutro</Badge>
      )}
    </>
  );
}
