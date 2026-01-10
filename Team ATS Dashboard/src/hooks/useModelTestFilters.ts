import { useGetSubjectsQuery } from "@/store/api/subjectApi";
import { useGetSubTopicsQuery } from "@/store/api/subTopicApi";
import { useGetTopicsQuery } from "@/store/api/topicApi";
import { useEffect, useState } from "react";

export const useModelTestFilters = (mainCategory: string | undefined) => {
  const [subject, setSubject] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const [subTopic, setSubTopic] = useState<string>();

  const { data: subjects, isFetching: isFetchingSubjects } =
    useGetSubjectsQuery(
      { page: 1, limit: 1000, mainCategory },
      { skip: !mainCategory }
    );

  const { data: topics, isFetching: isFetchingTopics } = useGetTopicsQuery(
    { page: 1, limit: 1000, subject: subject as string },
    { skip: !subject }
  );

  const { data: subTopics, isFetching: isFetchingSubTopics } =
    useGetSubTopicsQuery(
      { page: 1, limit: 1000, topic: topic as string },
      { skip: !topic }
    );

  useEffect(() => {
    if (!subject && subjects?.data && subjects?.data?.length > 0) {
      setSubject(subjects.data[0].subjectName);
    }
  }, [subjects?.data, subject]);

  return {
    subject,
    topic,
    subTopic,
    setSubject,
    setTopic,
    setSubTopic,
    subjects: subjects?.data,
    topics: topics?.data,
    subTopics: subTopics?.data,
    isFetchingSubjects,
    isFetchingTopics,
    isFetchingSubTopics,
  };
};
