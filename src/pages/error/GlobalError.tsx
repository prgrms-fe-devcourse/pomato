import { House, TriangleAlert } from "lucide-react";
import { Link } from "react-router";

import Button from "@components/Button";

export default function GlobalError() {
  return (
    <main className="bg-gradient flex min-h-dvh w-full flex-col items-center justify-center gap-6">
      <div>
        <TriangleAlert width={64} height={64} className="opacity-65" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-7xl opacity-65">ERROR</h1>
        <div className="flex flex-col items-center gap-1">
          <h2 className="heading-text-xs">문제가 발생했습니다</h2>
          <p className="label-text-m opacity-75">
            예상치 못한 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
      </div>
      <Link to="/">
        <Button>
          <House /> 메인 화면으로 돌아가기
        </Button>
      </Link>
    </main>
  );
}
