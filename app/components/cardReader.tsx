import { Button } from "@/components/ui/button";
import Link from "next/link";
import { parseSlug } from "../utils/parse-slug";

interface Reader {
    id: number;
    title: string;
    href: string
}
export function CardReader(props: Reader) {
  return (
    <li key={props.id}>
      <Button variant="secondary" className="w-full mb-2" asChild>
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
