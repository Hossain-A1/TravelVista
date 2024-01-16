"use client";

import * as React from "react";
import { BookOpenCheck, ChevronsUpDown, Hotel, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const NavMenu = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='space-x-2 cursor-pointer'
          onClick={() => router.push("/hotel/new")}
        >
          <Plus size={15} className='w-[1.2rem] h-[1.2rem]' />{" "}
          <span>Add Hotel</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='space-x-2 cursor-pointer'
          onClick={() => router.push("/my-hotel")}
        >
          <Hotel size={15} className='w-[1.2rem] h-[1.2rem]' />{" "}
          <span>My Hotel</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='space-x-2 cursor-pointer'
          onClick={() => router.push("/my-bookings")}
        >
          <BookOpenCheck size={15} className='w-[1.2rem] h-[1.2rem]' />{" "}
          <span>My Bookings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMenu;
