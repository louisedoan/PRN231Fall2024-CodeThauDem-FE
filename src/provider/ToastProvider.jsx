import { Toaster } from "react-hot-toast";


const ToasterProvider = () => {
    return(
        <Toaster
        position="center-top"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
            top: 20,
            right: 20,
        }}
        toastOptions={{
            // Define default options
            className: '',
            duration: 4000,
            style: {
                background: '#333',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            success: {
                duration: 4000,
                theme: {
                    primary: 'green',
                    secondary: 'white',
                },
                iconTheme: {
                    primary: 'green',
                    secondary: 'white',
                },
                style: {
                    background: '#4caf50',
                    color: '#fff',
                },
            },
            error: {
                duration: 4000,
                theme: {
                    primary: 'red',
                    secondary: 'black',
                },
                iconTheme: {
                    primary: 'red',
                    secondary: 'white',
                },
                style: {
                    background: '#f44336',
                    color: '#fff',
                },
            },
            // Customize other types as needed
        }}
    />
    )
}

export default ToasterProvider;