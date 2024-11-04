import { useState } from "react"

import { Calendar } from "@phosphor-icons/react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button, DatePicker, Popover, PopoverContent, PopoverTrigger } from "keep-react"

const DatePickerCustom = ({ defaultDate = new Date() }: DatePickerCustomProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate)
  return (
    <Popover showArrow={false} placement="top-start">
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="w-full justify-start gap-2 rounded-xl border border-metal-50 px-4 text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100 dark:border-metal-800 dark:bg-metal-800 dark:text-white dark:hover:bg-metal-800"
          variant="outline"
          color="secondary"
        >
          <Calendar size={20} className="text-metal-400 dark:text-white" />
          {date ? (
            format(date ?? new Date(), "PPP", { locale: es })
          ) : (
            <span>Select Your Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 max-w-min">
        <DatePicker
          mode="single"
          locale={es}
          selected={date}
          onSelect={setDate}
          showOutsideDays={true}
        />
      </PopoverContent>
    </Popover>
  )
}

type DatePickerCustomProps = {
  defaultDate?: Date
}

export default DatePickerCustom
