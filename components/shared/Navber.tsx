"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SearchBar from "../SearchBar";
import { ModeToggle } from "../../components/Theme-toggle";
import NavMenu from "../NavMenu";
const Navber = () => {
  const { userId } = useAuth();
  const router = useRouter();
  return (
    <header className='sticky top-0 border border-b-primary/10 bg-secondary'>
      <Container>
        <nav className='flex items-center justify-between'>
          <Link href='/' className='flex items-center cursor-pointer'>
            <Image src='/logo.svg' alt='logo' height='30' width='30' />

            <div className='font-bold text-2xl'>TravelVista</div>
          </Link>

          <div>
            <ul className='flex gap-5'>
              <li>
                <Link href='/home'>Home</Link>
              </li>
              <li>
                <Link href='/about-us'>AboutUs</Link>
              </li>
              <li>
                <Link href='/contact-us'>ContactUS</Link>
              </li>
            </ul>
          </div>
          <SearchBar />
          <div className='flex gap-3 items-center'>
            <div><ModeToggle/>
            <NavMenu/>
            </div>
            <UserButton afterSignOutUrl='/' />

            {!userId && (
              <>
                <Button
                  onClick={() => router.push("/sign-in")}
                  variant='destructive'
                  size='sm'
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => router.push("/sign-up")}
                  variant='outline'
                  size='sm'
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navber;
