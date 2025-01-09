
import loader from '../../assets/img/loader.svg';
const TestLoader = () => {
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            width: '100%' 
        }}>
            <img src={loader}  alt="Loader" />
        </div>
    );
};

export default TestLoader;
