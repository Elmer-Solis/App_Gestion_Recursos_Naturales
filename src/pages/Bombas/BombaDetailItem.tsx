type BombaDetailItemProps = {
    label: string
    data: string
}

export default function BombaDetailItem({ label, data }: BombaDetailItemProps) {
    return (
        <p className=" uppercase dark:text-white font-bold ">{label}:
            <span className="font-normal normal-case">{' '}{data}</span>
        </p>
    )
}
