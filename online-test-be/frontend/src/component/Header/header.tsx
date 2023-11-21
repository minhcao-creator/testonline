import { useLocation } from 'react-router-dom';


export default function Header() {
    const location = useLocation();
    const currentUserInfo = location.state && location.state.userInfo;
    console.log(currentUserInfo);
    console.log(123123, currentUserInfo)
    if(currentUserInfo && currentUserInfo.currentUser.length > 0){
        if(currentUserInfo.isTeacher){
            return (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid p-2">
                        <div className="navbar-brand" style={{ "marginLeft": "50px" }}>Test Online</div>
                        <div>
                            {/* <a href="/Login" style={{ "marginRight": "20px" }}><button type="button" className="btn btn-primary">Login</button></a> */}
                            <span style={{ "marginRight": "20px" }}>Hello Teacher {currentUserInfo.currentUser[0].name}</span>
                        </div>  
                    </div>
                </nav>
            )
        }
        else{
            return (
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid p-2">
                        <div className="navbar-brand" style={{ "marginLeft": "50px" }}>Test Online</div>
                        <div>
                            {/* <a href="/Login" style={{ "marginRight": "20px" }}><button type="button" className="btn btn-primary">Login</button></a> */}
                            <span style={{ "marginRight": "20px" }}>Hello Student {currentUserInfo.currentUser[0].name}</span>
                        </div>  
                    </div>
                </nav>
            )
        }
    }
    else{
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid p-2">
                    <div className="navbar-brand" style={{ "marginLeft": "50px" }}>Test Online</div>
                    <div>
                        <a href="/Login" style={{ "marginRight": "20px" }}><button type="button" className="btn btn-primary">Login</button></a>
                    </div>
                </div>
            </nav>
        )
    }
}

