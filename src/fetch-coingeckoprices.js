import useSWR from "swr";

export default function CoingeckoPriceData() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PRICES_HOST}/prices`
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
