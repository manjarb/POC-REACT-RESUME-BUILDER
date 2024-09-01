import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import DraggableCard from '../../components/DraggableCard/DraggableCard';

import { useHomePage } from './useHomePage';

import classes from './HomePage.module.scss';

export default function HomePage() {
  const { savedTemplates } = useHomePage();

  return (
    <div className={classes.container}>
      <div
        className={`text-center p-t-30 p-l-15 p-r-15 p-b-30 ${classes.leftContainer}`}
      >
        <Link to="templates/create">
          <Button className='m-b-15'>Create new Template</Button>
        </Link>
        {savedTemplates.map(({ id, formValue: { templateName } }) => (
          <div key={id} className='m-b-15'>
            <DraggableCard
              title={templateName || ''}
              id={id}
              onMoveCard={() => undefined}
              showArrow={false}
              showDelete={false}
            />
          </div>
        ))}
      </div>
      <div className="text-center p-t-30 p-l-15 p-r-15">
        <Link to="resumes/create">
          <Button variant="success">Create new Resume</Button>
        </Link>
      </div>
    </div>
  );
}
