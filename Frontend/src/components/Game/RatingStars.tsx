import star_icon from "../../assets/Star icon.svg"
import star_icon_golden from "../../assets/Star icon golden.svg"
import star_half_icon from "../../assets/Star Half Icon.svg"

export default function RatingStars({rating}: {rating: number}) {
  return(
    <>
      <img src={rating < 1 && rating > 0 ? star_half_icon : rating >= 1 ? star_icon_golden : star_icon} />
      <img src={rating < 2 && rating > 1  ? star_half_icon : rating >= 2 ? star_icon_golden : star_icon} />
      <img src={rating < 3 && rating > 2  ? star_half_icon : rating >= 3 ? star_icon_golden : star_icon} />
      <img src={rating < 4 && rating > 3  ? star_half_icon : rating >= 4 ? star_icon_golden : star_icon} />
      <img src={rating < 5 && rating > 4  ? star_half_icon : rating >= 5 ? star_icon_golden : star_icon} />
    </>
  )
}