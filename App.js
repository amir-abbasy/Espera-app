import Root_Nav from './src/navigation';
import Provider from './src/store/Context';
const App = () => {
  return (
    <Provider>
      <Root_Nav />
    </Provider>
  );
};
export default App;
