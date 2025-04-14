'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Reader {
  id: string;
  title: string;
  href: string
}
export function CardReader(props: Reader) {

  return (
    <li key={props.id} className="flex items-center justify-center flex-1">
      <Button variant="secondary" className="w-full" asChild>
        <Link
          className="text-left font-medium"
          href={props.href}
        >
          {props.title}
        </Link>
      </Button>     
    </li>
  );
}
