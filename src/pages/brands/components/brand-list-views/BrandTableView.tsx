import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react"
import moment from "moment"
import { Link } from "react-router-dom"

import { BrandResponse } from "@/common/interfaces/brand.interface"

import "moment/dist/locale/es"
moment.locale("es")

const BrandTableView = ({ list }: BrandTableViewProps) => {
  const formattedData = (date: string) => {
    const formated = moment(date, "YYYY/MM/DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")
    return moment(formated).calendar()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Creado</TableHead>
          <TableHead>Actualizado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((brandItem: BrandResponse) => (
          <TableRow key={`categoria-${brandItem.id}`}>
            <TableCell>{brandItem.id}</TableCell>
            <TableCell>{brandItem.name}</TableCell>
            <TableCell>{brandItem.description}</TableCell>
            <TableCell className="normal-case">
              {formattedData(brandItem.created_at)}
            </TableCell>
            <TableCell className="normal-case">
              {formattedData(brandItem.updated_at)}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link to={`./${brandItem.id}`}>
                  <Button shape="icon" color="primary" variant="link">
                    <PencilSimpleLine
                      size={20}
                      weight="duotone"
                      className="text-primary-100"
                    />
                  </Button>
                </Link>
                <Button shape="icon" color="secondary" variant="link">
                  <TrashSimple size={20} className="text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type BrandTableViewProps = {
  list: BrandResponse[]
}

export default BrandTableView
