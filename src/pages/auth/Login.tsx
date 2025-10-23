import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router";

import github from "@assets/auth/github.svg";
import google from "@assets/auth/google.svg";
import kakao from "@assets/auth/kakao.svg";
import Button from "@components/Button";
import Input from "@components/Input";
import { loginWithOAuth } from "@features/auth/api/login";

export default function Login() {
  return (
    <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-hidden px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 md:gap-8 md:px-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-4 sm:gap-5">
        <div className="bg-wh/15 dark:bg-bl/20 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16 md:h-18 md:w-18">
          <User width={28} height={28} className="sm:h-8 sm:w-8" />
        </div>

        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <h3 className="heading-text-xs sm:heading-text-s md:heading-text-m text-center">
            다시 만나 반가워요
          </h3>
          <p className="label-text-xs sm:label-text-s text-center opacity-90">
            로그인하고 집중을 이어가세요
          </p>
        </div>
      </header>

      <form className="flex w-full max-w-[320px] flex-col justify-center gap-3.5 sm:max-w-md sm:gap-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="label-text-xs">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            Icon={{ Component: Mail, align: "left" }}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="label-text-xs">
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            Icon={{ Component: Lock, align: "left" }}
          />
        </div>

        <Button type="submit" intent="primary" className="h-10 w-full sm:h-11">
          로그인
        </Button>
      </form>

      <div className="flex w-full max-w-[320px] items-center gap-2 px-2 sm:max-w-md sm:px-4">
        <hr className="border-wh/60 dark:border-wh/40 flex-1 border-t" />
        <span className="label-text-2xs sm:label-text-xs whitespace-nowrap">간편하게 시작하기</span>
        <hr className="border-wh/60 dark:border-wh/40 flex-1 border-t" />
      </div>

      <div className="flex gap-2">
        <Button
          shape="circle"
          composition="iconOnly"
          intent="subtle"
          className="h-10 w-10"
          onClick={() => void loginWithOAuth("google")}
        >
          <img src={google} alt="Google 로그인" />
        </Button>
        <Button
          shape="circle"
          composition="iconOnly"
          intent="subtle"
          className="h-10 w-10"
          onClick={() => void loginWithOAuth("kakao")}
        >
          <img src={kakao} alt="Kakao 로그인" />
        </Button>
        <Button
          shape="circle"
          composition="iconOnly"
          intent="subtle"
          className="h-10 w-10"
          onClick={() => void loginWithOAuth("github")}
        >
          <img src={github} alt="GitHub 로그인" />
        </Button>
      </div>

      <p className="label-text-xs sm:label-text-s flex gap-1 opacity-90">
        아직 계정이 없으신가요?
        <Link to="/signup" className="font-bold hover:underline">
          회원가입
        </Link>
      </p>
    </section>
  );
}
