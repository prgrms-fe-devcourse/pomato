import { CircleAlert, House } from "lucide-react";
import { Link } from "react-router";

import Button from "@components/Button";

export default function NotFound() {
  return (
    <main className="bg-gradient flex min-h-dvh w-full flex-col items-center justify-center gap-6">
      <div>
        <CircleAlert width={64} height={64} className="opacity-65" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-7xl opacity-65">404</h1>
        <div className="flex flex-col items-center gap-1">
          <h2 className="heading-text-xs">페이지를 찾을 수 없습니다</h2>
          <p className="label-text-m opacity-75">
            요청하신 페이지가 존재하지 않거나 이동되었습니다
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
