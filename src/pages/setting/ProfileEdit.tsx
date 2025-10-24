import { User, AtSign } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import { useIsMobile } from "@hooks/useIsMobile";

export default function ProfileEdit() {
  const isMobile = useIsMobile();
  return (
    <section className="scroll-y-auto pc-scroll flex min-h-0 flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:gap-10 md:px-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-4 sm:gap-5">
        <div className="relative">
          <Avatar status="edit" size={isMobile ? "l" : "xl"} />
        </div>

        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <h3 className="heading-text-xs sm:heading-text-s md:heading-text-m text-center">
            오랜만이에요
          </h3>
          <p className="label-text-xs sm:label-text-s text-center opacity-90">
            함께 집중하는 메이트들에게 나를 소개해요
          </p>
        </div>
      </header>

      <form
        action="#"
        method="post"
        className="flex w-full max-w-xl flex-col justify-center gap-4 sm:gap-5"
        noValidate
      >
        <div className="space-y-1.5">
          <label htmlFor="displayName" className="label-text-xs">
            이름
          </label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="이름을 입력해주세요"
            Icon={{ Component: User, align: "left" }}
            defaultValue=""
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="username" className="label-text-xs">
            아이디
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="아이디를 입력해주세요"
            Icon={{ Component: AtSign, align: "left" }}
            defaultValue=""
          />
          <p className="label-text-xs pl-1 opacity-70">
            영문 소문자, 숫자, 밑줄(_) 조합을 권장해요.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="bio" className="label-text-xs">
            소개
          </label>
          <div className="relative">
            <textarea
              id="bio"
              name="bio"
              rows={5}
              placeholder="자신을 소개해주세요"
              className={twMerge(
                "paragraph-text-s pc-scroll min-h-[100px] w-full flex-1 resize-none rounded-lg border px-4 py-2.5",
                "bg-wh/20 dark:bg-bl/30 border-wh/15 dark:border-wh/12 text-wh placeholder:text-wh/50",
                "transition-colors duration-150 ease-out",
                "hover:bg-wh/25 hover:dark:bg-bl/40",
                "focus:bg-wh/30 focus:dark:bg-bl/45 focus:border-wh/30 focus:dark:border-wh/25",
                "active:bg-wh/35 active:dark:bg-bl/55",
                "ring-0 focus:shadow-[0_0_0_1px_rgba(250,250,250,0.06)] focus:ring-0 focus:outline-none",
                "disabled:bg-wh/10 disabled:border-wh/10 disabled:dark:bg-bl/20 disabled:dark:border-wh/8 disabled:text-wh/50 disabled:placeholder:text-wh/50 disabled:cursor-not-allowed disabled:opacity-60",
                "pc-scroll outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-0",
              )}
              defaultValue=""
            />
          </div>
          <div className="flex items-center justify-between">
            {/* <p className="label-text-xs opacity-70">최대 200자</p>
            <span className="label-text-xs opacity-70" aria-live="polite">
              길이 카운터는 이후 제어형으로 전환 시 연결
            </span> */}
          </div>
        </div>

        <div className="mt-2 flex gap-3 sm:gap-4">
          <Button intent="ghost" className="h-10 flex-1 sm:h-11">
            취소
          </Button>
          <Button intent="primary" className="h-10 flex-1 sm:h-11">
            저장
          </Button>
        </div>
      </form>
    </section>
  );
}
