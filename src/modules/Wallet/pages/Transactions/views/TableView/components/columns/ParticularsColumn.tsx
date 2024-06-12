import React from 'react'

function ParticularsColumn({
  particulars
}: {
  particulars: string
}): React.ReactElement {
  return <td className="min-w-96 p-2">{particulars}</td>
}

export default ParticularsColumn
