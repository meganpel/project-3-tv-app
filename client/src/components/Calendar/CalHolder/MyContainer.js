 import React from "react";

const MyContainer = props => (
     
            <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
                
                    <div style={{ background: '#f0f0f0' }}>What is your favorite day?</div>
                    <div style={{ position: 'relative' }}>
                        {props.children}
                    </div>
            </div>
        );
    

    export default MyContainer;