import { UserPlus } from "lucide-react";
import { Link } from "react-router";

import Button from "@components/Button";

export default function Signup() {
  return (
    <section className="flex min-h-dvh flex-1 flex-col items-center justify-center gap-6">
      <header className="flex flex-col items-center justify-center gap-6">
        <div className="bg-wh/15 dark:bg-bl/20 flex h-15 w-15 items-center justify-center rounded-full">
          <UserPlus width={32} height={32} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="heading-text-s">새로운 메이트가 되어주세요</h3>
          <p className="label-text-s">간단한 정보 입력만으로 바로 시작할 수 있어요</p>
        </div>
      </header>
      <div className="flex justify-center">
        <Button intent="primary" className="w-100">
          이메일로 가입하기
        </Button>
      </div>
      <div className="flex w-full items-center gap-2 px-4">
        <hr className="border-wh/60 dark:border-wh/40 flex-1 border-t" />
        <span className="label-text-xs">간편하게 시작하기</span>
        <hr className="border-wh/60 dark:border-wh/40 flex-1 border-t" />
      </div>
      <div className="flex flex-col">
        <Button>Google로 가입하기</Button>
        <Button>GitHub로 가입하기</Button>
        <Button>kakao로 가입하기</Button>
      </div>
      <p className="label-text-s flex gap-1 opacity-90">
        이미 계정이 있으신가요?
        <Link to="/login">
          <span className="font-bold hover:underline">로그인</span>
        </Link>
      </p>
    </section>
  );
}
