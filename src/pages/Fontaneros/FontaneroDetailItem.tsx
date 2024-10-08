type FontaneroDetailItemProps = {
    label: string
    data: string
}

export default function FontaneroDetailItem({ label, data }: FontaneroDetailItemProps) {
    return (
        <p className=" uppercase dark:text-white font-bold ">{label}:
            <span className="font-normal normal-case">{' '}{data}</span>
        </p>
    )
}
