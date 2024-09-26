import Link from 'next/link';
import Image from 'next/image';
import { Gothic_A1 } from 'next/font/google'

const gothic = Gothic_A1({
  weight: '300',
  subsets: ['latin'],
})


export default function Home() {

  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        <div className="flex items-center justify-center  mt-[50px]">
          <Image
            src="/images/ifメモ_logo_vertical-full_1800X1514_colored-removebg-preview.png" // 配置した画像のパスを記述する。
            alt="Top Image"
            width={300}
            height={200}
            className="sm:w-[500px] lg:w-[600px]"
          />
        </div>
        <Link href="/memory" className="button-49 w-[250px] sm:w-[400px] text-xl sm:text-2xl my-[40px]">思い出を覗く</Link>
        <div className={`${gothic.className} text-[#24a9a6] text-[24px] sm:text-[32px] lg:text-[38px] my-[100px] sm:my-[50px] mx-6 sm:mx-[50px] lg:mx-[200px]`}>
          <p>思い出のifの世界線をAIが作ってくれるです。</p>
          <p>あの時もし告白していたら..のようにもしもの世界を考えたことはありませんか？</p>
          <p>このアプリではユーザーがもし○○だったら..のストーリーをAIが考えてくれます。</p>
          <p>他のユーザーの思い出とＡＩストーリーを覗いてみましょう。</p>
        </div>
      </div>
    </>
  );
}
