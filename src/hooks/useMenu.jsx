import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // useEffect(() => {
  //     fetch('http://localhost:5000/menu')
  //     .then(res => res.json())
  //     .then(data =>{
  //         setMenu(data);
  //         setLoading(false);
  //     })
  // }, [])
  const {data: menu = [], isPending: loading, refetch} = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  return [menu, loading, refetch];
};

export default useMenu;
