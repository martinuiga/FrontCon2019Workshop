// eslint-disable
// this is an auto generated file. This will be overwritten

export const getMeetup = `query GetMeetup($id: ID!) {
  getMeetup(id: $id) {
    id
    name
    group
    location
    date
    startTime
    endTime
    description
  }
}
`;
export const listMeetups = `query ListMeetups(
  $filter: ModelMeetupFilterInput
  $limit: Int
  $nextToken: String
) {
  listMeetups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      group
      location
      date
      startTime
      endTime
      description
    }
    nextToken
  }
}
`;
