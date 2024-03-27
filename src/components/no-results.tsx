type NoResultsProps = {
  content: string;
};
const NoResults = ({ content }: NoResultsProps) => {
  return (
    <div className="grid place-items-center h-full  text-gray-500">
      {content}
    </div>
  );
};

export default NoResults;
