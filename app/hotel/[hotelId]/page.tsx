import { getHotelById } from "@/action/getHotelById";
import HotelForm from "@/components/hotel/HotelForm";
import { auth } from "@clerk/nextjs";

interface HotelDetailsPageProps {
  params: {
    hotelId: string;
  };
}
const HotelDetailsPage = async ({ params }: HotelDetailsPageProps) => {
  const hData = await getHotelById(params.hotelId)
  const {userId} = auth()

  if(!userId) return <p>Not authenticitated.....</p>
  if(hData && hData.userId !== userId ) return <p>Access deniet.....</p>
  return (
    <div>
      <HotelForm hotel={hData} />
    </div>
  );
};

export default HotelDetailsPage;
