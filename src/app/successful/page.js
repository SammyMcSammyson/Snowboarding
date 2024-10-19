import BackButton from '../../Components/Backbutton.jsx';

export default async function submissionSuccess() {
  return (
    <div className='container-box'>
      <p> Your submission was succesful</p>
      <p>
        <BackButton />
      </p>
    </div>
  );
}
