import React from "react";

import { IHotel } from "models";

import { DashboardViewStyle } from "./index.style";

import { ControlBarComponent, CardComponent } from "components/common";

type DashboardViewProps = {
  hotels: IHotel[],
};

export const DashboardView: React.FC<DashboardViewProps> = ({ hotels }) => {
  const [rating, setRating] = React.useState<number>(0);
  const [adult, setAdult] = React.useState<number>(0);
  const [children, setChildren] = React.useState<number>(0);

  const setRatingHandler = (value: number) => {
    setRating(value);
  }

  const setAdultHandler = (value: number) => {
    setAdult(value);
  }

  const setChildrenHandler = (value: number) => {
    setChildren(value);
  }

  return (
    <DashboardViewStyle>
      <div className="controlbar-container">
        <ControlBarComponent setRating={setRatingHandler} setAdult={setAdultHandler} setChildren={setChildrenHandler} />
      </div>
      <div className="content-container">
        {
          hotels.map((hotel, index) => {
            return (
              <div key={index}>
                {
                  Number(hotel.starRating) >= rating ? (
                    <CardComponent hotels={hotels[index]} index={index} key={index} adult={adult} children={children} />
                  ) : (
                    <div></div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </DashboardViewStyle>
  )
}