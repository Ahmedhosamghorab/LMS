
export default function NavBarItem(props:any): JSX.Element
{
    return(
        <div className={`flex gap-2 items-center  p-3 justify-start text-center  hover:bg-purple-300 transition-all rounded-lg cursor-pointer ${props.classes}`}>
            {props.icon}
            <p>{props.text}</p>
        </div>
    )
}