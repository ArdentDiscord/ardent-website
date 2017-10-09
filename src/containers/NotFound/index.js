import universal from 'react-universal-component';
import Loading from '../../components/pages/Loading/Loading';

export default universal(() => import('./NotFound'), {
  loading: Loading
});
