import { problems } from "@/lib/problem";
import QuestionComponent from "@/app/components/question/questionComponent";

// Question type
type Question = {
  "id": number;
 "difficulty": string;
  "problem_statement": string;
  "input"?: string;
  "output"?: string;
  "explanation": string;
};

// Props type for App Router dynamic page
type QuestionPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    success?: string;
  }>;
};

const QuestionPage = async({ params , searchParams}: QuestionPageProps) => {
    const { id } = await params;
  const questionId = parseInt(id, 10);
  console.log("Question id" , questionId)
  const {success} = await searchParams;
  console.log("Status of this question : " , success);

  const question: Question | undefined = problems.find(
    (q) => q.id === questionId
  );
  
  if (!question) return <div>Question not found</div>;

  return <QuestionComponent question={question}/>;
};

export default QuestionPage;