import { Link } from "react-router-dom"

import { HOST } from "@/common/config/constants"
import { getShortName } from "@/common/helpers/avatar.helper"
import { BrandResponse } from "@/common/interfaces/brand.interface"
import FallbackImage from "@/components/FallbackImage"

const BrandCardView = ({ list }: BrandCardViewProps) => {
  return (
    <div className="flex items-stretch flex-wrap justify-center xl:justify-start gap-8">
      {list.map((brandItem: BrandResponse) => (
        <Link
          to={`/categorias/${brandItem.id}`}
          className="group w-28 md:w-40 h-auto flex justify-center items-stretch bg-white dark:bg-metal-900 shadow-md rounded-md"
          key={`category-${brandItem.id}`}
        >
          <div className="flex flex-col items-center">
            <div className="bg-afer-950 text-white dark:bg-afer-900 dark:text-afer-500 w-28 h-28 md:w-40 md:h-40 rounded group-hover:border-2 group-hover:border-solid group-hover:border-metal-900 group-hover:dark:border-metal-100 overflow-hidden flex justify-center items-center">
              <div className="flex justify-center align-center group-hover:scale-110 transition ease-linear duration-300">
                {brandItem?.picture ? (
                  <FallbackImage
                    src={`${HOST}/pictures/${brandItem?.picture?.folder}/${brandItem.picture?.url_picture}`}
                    alt={brandItem.name}
                    className="w-28 h-28 md:w-40 md:h-40 object-cover"
                  >
                    <div className="w-full h-full flex justify-center items-center">
                      <h3 className="font-bold text-4xl">
                        {getShortName(brandItem.name)}
                      </h3>
                    </div>
                  </FallbackImage>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <h3 className="font-bold text-4xl">
                      {getShortName(brandItem.name)}
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <p className="font-medium group-hover:text-afer-700 group-hover:dark:text-afer-400 text-center text-lg my-2 leading-6">
              {brandItem.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

type BrandCardViewProps = {
  list: BrandResponse[]
}

export default BrandCardView
