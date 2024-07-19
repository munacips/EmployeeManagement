
const Header = (props) =>{
    return (
        <header>
            <h1 style={headingStyle}>{props.title}</h1>
            <hr />
        </header>
    )
}

Header.defaultProps = {
    title : "Employee Management system"
}

const headingStyle = {
    color : 'black',
    textAlign : 'center'
}

export default Header