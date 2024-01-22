"use client";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { UploadButton } from "@/components/uploadthing";
import Image from "next/image";
import { Loader2, PencilLine, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";

interface HotelFormProps {
  hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be more than 3 Characters",
  }),
  description: z.string().min(10, {
    message: "Description must be more than 10 Characters",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  country: z.string().min(1 , {
    message: "Country is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: "Description must be more than 10 Characters",
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimnPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});

const HotelForm = ({ hotel }: HotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [isImageDelete, setIsImageDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<IState[]>([]);
  const [city, setCity] = useState<ICity[]>([]);

  const { getAllCountries, getCityByCode, getCountryState, getStateByCode } =
    useLocation();
  const countries = getAllCountries();
  console.log(image);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: hotel || {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimnPool: false,
      coffeeShop: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, []);

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const countryState = getCountryState(selectedCountry);
    if (countryState) {
      setState(countryState);
    }
  }, [form.watch("country")]);
  useEffect(() => {
    const selectedCountry = form.watch("country");
    const selectedState = form.watch("state");
    const stateCity = getCityByCode(selectedCountry, selectedState);
    if (stateCity) {
      setCity(stateCity);
    }
  }, [form.watch("country"), form.watch("state")]);

  const handleDeleteImage = (iamge: string) => {
    setIsImageDelete(true);
    const imagekey = image?.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", { imagekey })
      .then((res) => {
        if (res.data.suceess) {
          setImage("");
          toast.success("Image Removed");
        }
      })
      .catch(() => {
        toast.error("Somthing went wrong.");
      })
      .finally(() => {
        setIsImageDelete(false);
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <h2 className='font-medium text-xl'>
            {hotel
              ? "Update your hotel"
              : "Provide details about your accommodation."}
          </h2>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1 flex flex-col gap-6'>
              {" "}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Title *</FormLabel>
                    <FormDescription>Provide your hotel name.</FormDescription>
                    <FormControl>
                      <Input placeholder='Beach Hotel' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Description *</FormLabel>
                    <FormDescription>
                      Provide your hotel descrption
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder='Luxury Oasis in the Heart of the City'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Select the facilities and services</FormLabel>
                <FormDescription>
                  Choose the amenities and services available at your hotel
                </FormDescription>

                <div className='grid grid-cols-2 gap-4 mt-2'>
                  <FormField
                    control={form.control}
                    name='gym'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Gym</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='spa'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Spa</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bar'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Bar</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='coffeeShop'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Coffee Shop</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='laundry'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Laundry</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='restaurant'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Restaurant</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='shopping'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Shopping</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='freeParking'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Free Parking</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='bikeRental'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Bike Rental</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='freeWifi'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Free Wifi</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='movieNights'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Movie Nights</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='swimnPool'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end gap-3 rounded-md border border-primary/20 p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>SwimnPool</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-3'>
                    <FormLabel>Upload an Image *</FormLabel>
                    <FormDescription>
                      Select an image that beautifully highlights your hotel
                    </FormDescription>

                    <FormControl>
                      {image ? (
                        <>
                          <div className='relative max-w-[400px] max-h-[400px] min-w-[200px] min-h-[200px] mt-4'>
                            <Image
                              fill
                              src={image}
                              alt='hotel image'
                              className='object-contain'
                            />

                            <Button
                              onClick={() => handleDeleteImage(image)}
                              type='button'
                              size='icon'
                              variant='ghost'
                              className='absolute right-[12px] top-0'
                            >
                              {isImageDelete ? <Loader2 /> : <XCircle />}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className='flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded-md mt-4'>
                            <UploadButton
                              endpoint='imageUploader'
                              onClientUploadComplete={(res) => {
                                console.log("Files: ", res);
                                setImage(res[0].url);
                                toast.success("Image Upload Completed");
                              }}
                              onUploadError={(error: Error) => {
                                toast.error(
                                  `Image Upload Faild${error.message}`
                                );
                              }}
                            />
                          </div>
                        </>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-1 flex flex-col gap-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel>Select Country *</FormLabel>
                      <FormDescription>
                        In which country is your property located?
                      </FormDescription>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='bg-background'>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Select a Country'
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem className=''>
                      <FormLabel>Select State *</FormLabel>
                      <FormDescription>
                        In which state is your property located?
                      </FormDescription>
                      <Select
                        disabled={isLoading || state.length < 1}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='bg-background'>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Select a State'
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {state.map((st) => (
                            <SelectItem key={st.isoCode} value={st.isoCode}>
                              {st.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Select City</FormLabel>
                    <FormDescription>
                      In which city is your property located?
                    </FormDescription>
                    <Select
                      disabled={isLoading || city.length < 1}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='bg-background'>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a city'
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {city.map((ct) => (
                          <SelectItem key={ct.name} value={ct.name}>
                            {ct.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='locationDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Description *</FormLabel>
                    <FormDescription>
                      Provide a details location description of your hotel
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder='Located at the end of the beach road*'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-between gap-5 flex-wrap'>
                {hotel ? (
                  <>
                    {" "}
                    <Button className='max-w-[150px]' disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4' /> Updating
                        </>
                      ) : (
                        <>
                          <PencilLine className='mr-2 h-4 w-4' /> Update
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button className='max-w-[150px]' disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4' /> Creating{" "}
                      </>
                    ) : (
                      <>
                        <PencilLine className='mr-2 h-4 w-4' /> Create Hotel
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HotelForm;
