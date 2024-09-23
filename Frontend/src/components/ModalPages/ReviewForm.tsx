import Input from "../Input"
import { useState } from "react"
import star_icon from "../../assets/Star icon.svg"
import star_icon_golden from "../../assets/Star icon golden.svg"
import Button from "../Button"
export default function ReviewForm(){
    const [rating, setRating] = useState(0) //0 is default you need to get thing from database

    function StarsButton({rating}: {rating: number}) {
        return(
          <>
          <button onClick={() => setRating(1)}><img src={rating >= 1 ? star_icon_golden : star_icon} /></button>
          <button onClick={() => setRating(2)}><img src={rating >= 2 ? star_icon_golden : star_icon} /></button>
          <button onClick={() => setRating(3)}><img src={rating >= 3 ? star_icon_golden : star_icon} /></button>
          <button onClick={() => setRating(4)}><img src={rating >= 4 ? star_icon_golden : star_icon} /></button>
          <button onClick={() => setRating(5)}><img src={rating >= 5 ? star_icon_golden : star_icon} /></button>
          </>
        )
      }
    function StarReview(){
        return(
        <div className="mt-5">
            <p>Leave a review:</p>
            <div>
                <div className="">
                    <div className="flex">
                        <StarsButton rating={rating}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    return(
        <>
        <h2 className="text-2xl mb-4">Review</h2>
        <Input type="text" size="big" name="review" label="Review" placeholder="Write a review" style="light" icon="edit"></Input>
        <StarReview />
        <div className="flex">
        <Button className="mt-5 mr-2" size="big" style="purple" type="button" text="Submit" icon="send"/>
        <Button className="mt-5" size="big" type="button" text="Cancel" icon="cancel"/>
        </div>
        </>
    )
}