import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Article = FeedEvent & {
  __typename?: 'Article';
  body: Scalars['String'];
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Tag>>;
  title?: Maybe<Scalars['String']>;
};

export type ArticleEditedInput = {
  body: Scalars['String'];
  date?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ArticleEditedLinkFeedEvent = FeedEvent & {
  __typename?: 'ArticleEditedLinkFeedEvent';
  articleId: Scalars['String'];
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Tag>>;
};

export type ChildEvent = FeedEvent & {
  __typename?: 'ChildEvent';
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
};

export type Disc = {
  __typename?: 'Disc';
  brand: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  model: Scalars['String'];
  number: Scalars['Float'];
  status: DiscStatus;
};

export type DiscBrandInput = {
  brand: Scalars['String'];
  discId: Scalars['ID'];
};

export type DiscColorInput = {
  color: Scalars['String'];
  discId: Scalars['ID'];
};

export type DiscCreateInput = {
  brand: Scalars['String'];
  color?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
  model: Scalars['String'];
};

export type DiscLostInput = {
  discId: Scalars['ID'];
};

export type DiscRemoveInput = {
  discId: Scalars['ID'];
};

export enum DiscStatus {
  InBag = 'InBag',
  Lost = 'Lost',
  Unknown = 'Unknown'
}

export type DiscStatusInput = {
  discId: Scalars['ID'];
  status: DiscStatus;
};

export type DiscUpdateInput = {
  brand?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  model?: InputMaybe<Scalars['String']>;
};

export type DiscsInput = {
  statuses?: InputMaybe<Array<DiscStatus>>;
};

export type EventAddTagInput = {
  eventId: Scalars['String'];
  tag: Scalars['String'];
};

export type EventEditMessageInput = {
  eventId: Scalars['String'];
  message: Scalars['String'];
};

export enum EventName {
  AdventureCreated = 'AdventureCreated',
  AdventureDeleted = 'AdventureDeleted',
  AdventureImportStarted = 'AdventureImportStarted',
  ArticleEdited = 'ArticleEdited',
  ArticleEditedLink = 'ArticleEditedLink',
  ChildEventCreated = 'ChildEventCreated',
  CourseAdded = 'CourseAdded',
  CourseExcluded = 'CourseExcluded',
  CourseMapped = 'CourseMapped',
  CoursePlayed = 'CoursePlayed',
  DiscAdded = 'DiscAdded',
  DiscBrandUpdated = 'DiscBrandUpdated',
  DiscColorUpdated = 'DiscColorUpdated',
  DiscLost = 'DiscLost',
  DiscRemoved = 'DiscRemoved',
  DiscStatusUpdated = 'DiscStatusUpdated',
  DiscUpdated = 'DiscUpdated',
  DiscsReset = 'DiscsReset',
  EventDeleted = 'EventDeleted',
  EventMessageUpdated = 'EventMessageUpdated',
  EventTagCreated = 'EventTagCreated',
  EventTagRemoved = 'EventTagRemoved',
  HealthObservation = 'HealthObservation',
  MaintenanceCreated = 'MaintenanceCreated',
  MovieWatched = 'MovieWatched',
  NoteTaken = 'NoteTaken',
  PdgaCourseCached = 'PdgaCourseCached',
  PdgaCourseHeaderCreated = 'PdgaCourseHeaderCreated',
  PdgaSyncByStateRequested = 'PdgaSyncByStateRequested',
  PersonalRecordClimbingCreated = 'PersonalRecordClimbingCreated'
}

export type EventRemoveTagInput = {
  eventId: Scalars['String'];
  tagId: Scalars['String'];
};

export type FeedEvent = {
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Tag>>;
};

export type FeedInput = {
  types: Array<EventName>;
};

export type FeedResponse = {
  __typename?: 'FeedResponse';
  events: Array<FeedEvent>;
  total: Scalars['Int'];
};

export type HealthObservationEvent = FeedEvent & {
  __typename?: 'HealthObservationEvent';
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
};

export type MaintenanceCreatedEvent = FeedEvent & {
  __typename?: 'MaintenanceCreatedEvent';
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  equipment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
};

export type MovieWatchedEvent = FeedEvent & {
  __typename?: 'MovieWatchedEvent';
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  articleCreate: Article;
  discBrand?: Maybe<Disc>;
  discColor?: Maybe<Disc>;
  discCreate: Disc;
  discLost?: Maybe<Disc>;
  discRemove: Disc;
  discStatus?: Maybe<Disc>;
  discUpdate?: Maybe<Disc>;
  eventAddTag: Scalars['Boolean'];
  eventEditMessage: Scalars['Boolean'];
  eventRemove: Scalars['Boolean'];
  eventRemoveTag: Scalars['Boolean'];
};


export type MutationArticleCreateArgs = {
  input: ArticleEditedInput;
};


export type MutationDiscBrandArgs = {
  input: DiscBrandInput;
};


export type MutationDiscColorArgs = {
  input: DiscColorInput;
};


export type MutationDiscCreateArgs = {
  input: DiscCreateInput;
};


export type MutationDiscLostArgs = {
  input: DiscLostInput;
};


export type MutationDiscRemoveArgs = {
  input: DiscRemoveInput;
};


export type MutationDiscStatusArgs = {
  input: DiscStatusInput;
};


export type MutationDiscUpdateArgs = {
  input: DiscUpdateInput;
};


export type MutationEventAddTagArgs = {
  input: EventAddTagInput;
};


export type MutationEventEditMessageArgs = {
  input: EventEditMessageInput;
};


export type MutationEventRemoveArgs = {
  eventId: Scalars['String'];
};


export type MutationEventRemoveTagArgs = {
  input: EventRemoveTagInput;
};

export type NoteTakenEvent = FeedEvent & {
  __typename?: 'NoteTakenEvent';
  body: Scalars['String'];
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Tag>>;
};

export type Query = {
  __typename?: 'Query';
  discs: Array<Disc>;
  feed: FeedResponse;
  latestEventNames: Array<EventName>;
};


export type QueryDiscsArgs = {
  input?: InputMaybe<DiscsInput>;
};


export type QueryFeedArgs = {
  input?: InputMaybe<FeedInput>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UnknownEvent = FeedEvent & {
  __typename?: 'UnknownEvent';
  date: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Tag>>;
};

export type AllDiscPropsFragment = { __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null };

export type DiscsQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscsQuery = { __typename?: 'Query', discs: Array<{ __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null }> };

export type SetDiscStatusMutationVariables = Exact<{
  input: DiscStatusInput;
}>;


export type SetDiscStatusMutation = { __typename?: 'Mutation', discStatus?: { __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null } | null };

export type SetDiscColorMutationVariables = Exact<{
  input: DiscColorInput;
}>;


export type SetDiscColorMutation = { __typename?: 'Mutation', discColor?: { __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null } | null };

export type DiscCreateMutationVariables = Exact<{
  input: DiscCreateInput;
}>;


export type DiscCreateMutation = { __typename?: 'Mutation', discCreate: { __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null } };

export type DiscRemoveMutationVariables = Exact<{
  input: DiscRemoveInput;
}>;


export type DiscRemoveMutation = { __typename?: 'Mutation', discRemove: { __typename?: 'Disc', id: string, deleted?: boolean | null } };

export type DiscBrandMutationVariables = Exact<{
  input: DiscBrandInput;
}>;


export type DiscBrandMutation = { __typename?: 'Mutation', discBrand?: { __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null } | null };

export type DiscUpdateMutationVariables = Exact<{
  input: DiscUpdateInput;
}>;


export type DiscUpdateMutation = { __typename?: 'Mutation', discUpdate?: { __typename?: 'Disc', id: string, brand: string, model: string, number: number, color?: string | null, status: DiscStatus, deleted?: boolean | null } | null };

export type FeedQueryVariables = Exact<{
  input: FeedInput;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'FeedResponse', total: number, events: Array<{ __typename: 'Article', id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'ArticleEditedLinkFeedEvent', articleId: string, id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'ChildEvent', name: string, id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'HealthObservationEvent', name: string, id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'MaintenanceCreatedEvent', equipment?: string | null, name: string, id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'MovieWatchedEvent', name: string, id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'NoteTakenEvent', body: string, id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | { __typename: 'UnknownEvent', id: string, date: string, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null }> } };

export type LatestEventNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestEventNamesQuery = { __typename?: 'Query', latestEventNames: Array<EventName> };

export type EventRemoveMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventRemoveMutation = { __typename?: 'Mutation', eventRemove: boolean };

export type EventEditMessageMutationVariables = Exact<{
  input: EventEditMessageInput;
}>;


export type EventEditMessageMutation = { __typename?: 'Mutation', eventEditMessage: boolean };

export type EventAddTagMutationVariables = Exact<{
  input: EventAddTagInput;
}>;


export type EventAddTagMutation = { __typename?: 'Mutation', eventAddTag: boolean };

export type EventRemoveTagMutationVariables = Exact<{
  input: EventRemoveTagInput;
}>;


export type EventRemoveTagMutation = { __typename?: 'Mutation', eventRemoveTag: boolean };

export const AllDiscPropsFragmentDoc = gql`
    fragment AllDiscProps on Disc {
  id
  brand
  model
  number
  color
  status
  deleted
}
    `;
export const DiscsDocument = gql`
    query discs {
  discs {
    ...AllDiscProps
  }
}
    ${AllDiscPropsFragmentDoc}`;

/**
 * __useDiscsQuery__
 *
 * To run a query within a React component, call `useDiscsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDiscsQuery(baseOptions?: Apollo.QueryHookOptions<DiscsQuery, DiscsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiscsQuery, DiscsQueryVariables>(DiscsDocument, options);
      }
export function useDiscsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiscsQuery, DiscsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiscsQuery, DiscsQueryVariables>(DiscsDocument, options);
        }
export type DiscsQueryHookResult = ReturnType<typeof useDiscsQuery>;
export type DiscsLazyQueryHookResult = ReturnType<typeof useDiscsLazyQuery>;
export type DiscsQueryResult = Apollo.QueryResult<DiscsQuery, DiscsQueryVariables>;
export const SetDiscStatusDocument = gql`
    mutation setDiscStatus($input: DiscStatusInput!) {
  discStatus(input: $input) {
    ...AllDiscProps
  }
}
    ${AllDiscPropsFragmentDoc}`;
export type SetDiscStatusMutationFn = Apollo.MutationFunction<SetDiscStatusMutation, SetDiscStatusMutationVariables>;

/**
 * __useSetDiscStatusMutation__
 *
 * To run a mutation, you first call `useSetDiscStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDiscStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDiscStatusMutation, { data, loading, error }] = useSetDiscStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetDiscStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetDiscStatusMutation, SetDiscStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDiscStatusMutation, SetDiscStatusMutationVariables>(SetDiscStatusDocument, options);
      }
export type SetDiscStatusMutationHookResult = ReturnType<typeof useSetDiscStatusMutation>;
export type SetDiscStatusMutationResult = Apollo.MutationResult<SetDiscStatusMutation>;
export type SetDiscStatusMutationOptions = Apollo.BaseMutationOptions<SetDiscStatusMutation, SetDiscStatusMutationVariables>;
export const SetDiscColorDocument = gql`
    mutation setDiscColor($input: DiscColorInput!) {
  discColor(input: $input) {
    ...AllDiscProps
  }
}
    ${AllDiscPropsFragmentDoc}`;
export type SetDiscColorMutationFn = Apollo.MutationFunction<SetDiscColorMutation, SetDiscColorMutationVariables>;

/**
 * __useSetDiscColorMutation__
 *
 * To run a mutation, you first call `useSetDiscColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDiscColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDiscColorMutation, { data, loading, error }] = useSetDiscColorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetDiscColorMutation(baseOptions?: Apollo.MutationHookOptions<SetDiscColorMutation, SetDiscColorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDiscColorMutation, SetDiscColorMutationVariables>(SetDiscColorDocument, options);
      }
export type SetDiscColorMutationHookResult = ReturnType<typeof useSetDiscColorMutation>;
export type SetDiscColorMutationResult = Apollo.MutationResult<SetDiscColorMutation>;
export type SetDiscColorMutationOptions = Apollo.BaseMutationOptions<SetDiscColorMutation, SetDiscColorMutationVariables>;
export const DiscCreateDocument = gql`
    mutation discCreate($input: DiscCreateInput!) {
  discCreate(input: $input) {
    ...AllDiscProps
  }
}
    ${AllDiscPropsFragmentDoc}`;
export type DiscCreateMutationFn = Apollo.MutationFunction<DiscCreateMutation, DiscCreateMutationVariables>;

/**
 * __useDiscCreateMutation__
 *
 * To run a mutation, you first call `useDiscCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discCreateMutation, { data, loading, error }] = useDiscCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDiscCreateMutation(baseOptions?: Apollo.MutationHookOptions<DiscCreateMutation, DiscCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscCreateMutation, DiscCreateMutationVariables>(DiscCreateDocument, options);
      }
export type DiscCreateMutationHookResult = ReturnType<typeof useDiscCreateMutation>;
export type DiscCreateMutationResult = Apollo.MutationResult<DiscCreateMutation>;
export type DiscCreateMutationOptions = Apollo.BaseMutationOptions<DiscCreateMutation, DiscCreateMutationVariables>;
export const DiscRemoveDocument = gql`
    mutation discRemove($input: DiscRemoveInput!) {
  discRemove(input: $input) {
    id
    deleted
  }
}
    `;
export type DiscRemoveMutationFn = Apollo.MutationFunction<DiscRemoveMutation, DiscRemoveMutationVariables>;

/**
 * __useDiscRemoveMutation__
 *
 * To run a mutation, you first call `useDiscRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discRemoveMutation, { data, loading, error }] = useDiscRemoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDiscRemoveMutation(baseOptions?: Apollo.MutationHookOptions<DiscRemoveMutation, DiscRemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscRemoveMutation, DiscRemoveMutationVariables>(DiscRemoveDocument, options);
      }
export type DiscRemoveMutationHookResult = ReturnType<typeof useDiscRemoveMutation>;
export type DiscRemoveMutationResult = Apollo.MutationResult<DiscRemoveMutation>;
export type DiscRemoveMutationOptions = Apollo.BaseMutationOptions<DiscRemoveMutation, DiscRemoveMutationVariables>;
export const DiscBrandDocument = gql`
    mutation discBrand($input: DiscBrandInput!) {
  discBrand(input: $input) {
    ...AllDiscProps
  }
}
    ${AllDiscPropsFragmentDoc}`;
export type DiscBrandMutationFn = Apollo.MutationFunction<DiscBrandMutation, DiscBrandMutationVariables>;

/**
 * __useDiscBrandMutation__
 *
 * To run a mutation, you first call `useDiscBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discBrandMutation, { data, loading, error }] = useDiscBrandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDiscBrandMutation(baseOptions?: Apollo.MutationHookOptions<DiscBrandMutation, DiscBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscBrandMutation, DiscBrandMutationVariables>(DiscBrandDocument, options);
      }
export type DiscBrandMutationHookResult = ReturnType<typeof useDiscBrandMutation>;
export type DiscBrandMutationResult = Apollo.MutationResult<DiscBrandMutation>;
export type DiscBrandMutationOptions = Apollo.BaseMutationOptions<DiscBrandMutation, DiscBrandMutationVariables>;
export const DiscUpdateDocument = gql`
    mutation discUpdate($input: DiscUpdateInput!) {
  discUpdate(input: $input) {
    ...AllDiscProps
  }
}
    ${AllDiscPropsFragmentDoc}`;
export type DiscUpdateMutationFn = Apollo.MutationFunction<DiscUpdateMutation, DiscUpdateMutationVariables>;

/**
 * __useDiscUpdateMutation__
 *
 * To run a mutation, you first call `useDiscUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discUpdateMutation, { data, loading, error }] = useDiscUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDiscUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DiscUpdateMutation, DiscUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscUpdateMutation, DiscUpdateMutationVariables>(DiscUpdateDocument, options);
      }
export type DiscUpdateMutationHookResult = ReturnType<typeof useDiscUpdateMutation>;
export type DiscUpdateMutationResult = Apollo.MutationResult<DiscUpdateMutation>;
export type DiscUpdateMutationOptions = Apollo.BaseMutationOptions<DiscUpdateMutation, DiscUpdateMutationVariables>;
export const FeedDocument = gql`
    query feed($input: FeedInput!) {
  feed(input: $input) {
    total
    events {
      __typename
      id
      date
      tags {
        id
        name
      }
      ... on HealthObservationEvent {
        name
      }
      ... on ChildEvent {
        name
      }
      ... on MovieWatchedEvent {
        name
      }
      ... on NoteTakenEvent {
        body
      }
      ... on ArticleEditedLinkFeedEvent {
        articleId
      }
      ... on MaintenanceCreatedEvent {
        equipment
        name
      }
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const LatestEventNamesDocument = gql`
    query latestEventNames {
  latestEventNames
}
    `;

/**
 * __useLatestEventNamesQuery__
 *
 * To run a query within a React component, call `useLatestEventNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestEventNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestEventNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLatestEventNamesQuery(baseOptions?: Apollo.QueryHookOptions<LatestEventNamesQuery, LatestEventNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestEventNamesQuery, LatestEventNamesQueryVariables>(LatestEventNamesDocument, options);
      }
export function useLatestEventNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestEventNamesQuery, LatestEventNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestEventNamesQuery, LatestEventNamesQueryVariables>(LatestEventNamesDocument, options);
        }
export type LatestEventNamesQueryHookResult = ReturnType<typeof useLatestEventNamesQuery>;
export type LatestEventNamesLazyQueryHookResult = ReturnType<typeof useLatestEventNamesLazyQuery>;
export type LatestEventNamesQueryResult = Apollo.QueryResult<LatestEventNamesQuery, LatestEventNamesQueryVariables>;
export const EventRemoveDocument = gql`
    mutation eventRemove($eventId: String!) {
  eventRemove(eventId: $eventId)
}
    `;
export type EventRemoveMutationFn = Apollo.MutationFunction<EventRemoveMutation, EventRemoveMutationVariables>;

/**
 * __useEventRemoveMutation__
 *
 * To run a mutation, you first call `useEventRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventRemoveMutation, { data, loading, error }] = useEventRemoveMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventRemoveMutation(baseOptions?: Apollo.MutationHookOptions<EventRemoveMutation, EventRemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EventRemoveMutation, EventRemoveMutationVariables>(EventRemoveDocument, options);
      }
export type EventRemoveMutationHookResult = ReturnType<typeof useEventRemoveMutation>;
export type EventRemoveMutationResult = Apollo.MutationResult<EventRemoveMutation>;
export type EventRemoveMutationOptions = Apollo.BaseMutationOptions<EventRemoveMutation, EventRemoveMutationVariables>;
export const EventEditMessageDocument = gql`
    mutation eventEditMessage($input: EventEditMessageInput!) {
  eventEditMessage(input: $input)
}
    `;
export type EventEditMessageMutationFn = Apollo.MutationFunction<EventEditMessageMutation, EventEditMessageMutationVariables>;

/**
 * __useEventEditMessageMutation__
 *
 * To run a mutation, you first call `useEventEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventEditMessageMutation, { data, loading, error }] = useEventEditMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EventEditMessageMutation, EventEditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EventEditMessageMutation, EventEditMessageMutationVariables>(EventEditMessageDocument, options);
      }
export type EventEditMessageMutationHookResult = ReturnType<typeof useEventEditMessageMutation>;
export type EventEditMessageMutationResult = Apollo.MutationResult<EventEditMessageMutation>;
export type EventEditMessageMutationOptions = Apollo.BaseMutationOptions<EventEditMessageMutation, EventEditMessageMutationVariables>;
export const EventAddTagDocument = gql`
    mutation eventAddTag($input: EventAddTagInput!) {
  eventAddTag(input: $input)
}
    `;
export type EventAddTagMutationFn = Apollo.MutationFunction<EventAddTagMutation, EventAddTagMutationVariables>;

/**
 * __useEventAddTagMutation__
 *
 * To run a mutation, you first call `useEventAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventAddTagMutation, { data, loading, error }] = useEventAddTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventAddTagMutation(baseOptions?: Apollo.MutationHookOptions<EventAddTagMutation, EventAddTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EventAddTagMutation, EventAddTagMutationVariables>(EventAddTagDocument, options);
      }
export type EventAddTagMutationHookResult = ReturnType<typeof useEventAddTagMutation>;
export type EventAddTagMutationResult = Apollo.MutationResult<EventAddTagMutation>;
export type EventAddTagMutationOptions = Apollo.BaseMutationOptions<EventAddTagMutation, EventAddTagMutationVariables>;
export const EventRemoveTagDocument = gql`
    mutation eventRemoveTag($input: EventRemoveTagInput!) {
  eventRemoveTag(input: $input)
}
    `;
export type EventRemoveTagMutationFn = Apollo.MutationFunction<EventRemoveTagMutation, EventRemoveTagMutationVariables>;

/**
 * __useEventRemoveTagMutation__
 *
 * To run a mutation, you first call `useEventRemoveTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventRemoveTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventRemoveTagMutation, { data, loading, error }] = useEventRemoveTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventRemoveTagMutation(baseOptions?: Apollo.MutationHookOptions<EventRemoveTagMutation, EventRemoveTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EventRemoveTagMutation, EventRemoveTagMutationVariables>(EventRemoveTagDocument, options);
      }
export type EventRemoveTagMutationHookResult = ReturnType<typeof useEventRemoveTagMutation>;
export type EventRemoveTagMutationResult = Apollo.MutationResult<EventRemoveTagMutation>;
export type EventRemoveTagMutationOptions = Apollo.BaseMutationOptions<EventRemoveTagMutation, EventRemoveTagMutationVariables>;