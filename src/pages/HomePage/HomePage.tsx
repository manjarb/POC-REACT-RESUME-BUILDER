import classes from './HomePage.module.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className={classes.container}>
      <div className="text-center">
        <div className="m-b-20">
          <Link to="templates/create">
            <Button>Create new Template</Button>
          </Link>
        </div>

        <Link to="resumes/create">
          <Button variant="success">Create new Resume</Button>
        </Link>
      </div>
    </div>
  );
}
