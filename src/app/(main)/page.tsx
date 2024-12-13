import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href="/applications">
        <Button className="w-fit">
          <Plus /> <span>New Application</span>
        </Button>
      </Link>
    </div>
  );
}
