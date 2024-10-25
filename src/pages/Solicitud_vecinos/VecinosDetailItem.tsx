type FontaneroDetailItemProps = {
    label: string
    data: string
}

export function VecinosDetailItem({ label, data }: FontaneroDetailItemProps) {
    return (
        <p className=" uppercase dark:text-white font-bold ">{label}:
            <span className="font-normal normal-case">{' '}{data}</span>
        </p>
    )
}

