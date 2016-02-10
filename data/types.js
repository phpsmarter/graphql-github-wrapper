import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

import { usersFollowing, userFollowers, followingUrl } from './commonFields';
import axios from 'axios';

// Types for query object

export const UserInfoType = new GraphQLObjectType({
  name: "UserInfo",
  description: "Basic information on a GitHub user",
  fields: () => ({
    "login": { type: GraphQLString },
    "id": { type: GraphQLInt },
    "avatar_url": { type: GraphQLString },
    "gravatar_id": { type: GraphQLString },
    "url": { type: GraphQLString },
    "html_url": { type: GraphQLString },
    "followers_url": { type: GraphQLString },
    "following_url": followingUrl(),
    "gists_url": { type: GraphQLString },
    "starred_url": { type: GraphQLString },
    "subscriptions_url": { type: GraphQLString },
    "organizations_url": { type: GraphQLString },
    "repos_url": { type: GraphQLString },
    "events_url": { type: GraphQLString },
    "received_events_url": { type: GraphQLString },
    "type": { type: GraphQLString },
    "site_admin": { type: GraphQLBoolean },
    "name": { type: GraphQLString },
    "company": { type: GraphQLString },
    "blog": { type: GraphQLString },
    "location": { type: GraphQLString },
    "email": { type: GraphQLString },
    "hireable": { type: GraphQLBoolean },
    "bio": { type: GraphQLString },
    "public_repos": { type: GraphQLInt },
    "public_gists": { type: GraphQLInt },
    "followers": { type: GraphQLInt },
    "following": { type: GraphQLInt },
    "created_at": { type: GraphQLString },
    "updated_at": { type: GraphQLString },
    "users_following": usersFollowing(),
    "user_followers": userFollowers(),
    "repos": {
      type: new GraphQLList(DetailedRepoInfoType),
      description: "Fields about the user's repos",
      resolve: (obj) => {
        const url =  obj.repos_url;
        return axios.get(url)
                    .then(function(response) {
                      return response.data;
                    });
      }
    },
    "starred_repos": {
      type: new GraphQLList(DetailedRepoInfoType),
      description: "Fields about the repos user starred",
      resolve: (obj) => {
        const brackIndex = obj.starred_url.indexOf("{"),
              url =  obj.starred_url.slice(0, brackIndex);
        return axios.get(url)
                    .then(function(response) {
                      return response.data;
                    });
      }
    }
  })
});

export const OwnerRepoInfoType = new GraphQLObjectType({
  name: "OwnerRepoInfo",
  description: "Basic information on a owner of repo",
  fields: () => ({
    "login": { type: GraphQLString },
    "id": { type: GraphQLInt },
    "avatar_url": { type: GraphQLString },
    "gravatar_id": { type: GraphQLString },
    "url": { type: GraphQLString },
    "html_url": { type: GraphQLString },
    "followers_url": { type: GraphQLString },
    "following_url": followingUrl(),
    "gists_url": { type: GraphQLString },
    "starred_url": { type: GraphQLString },
    "subscriptions_url": { type: GraphQLString },
    "organizations_url": { type: GraphQLString },
    "repos_url": { type: GraphQLString },
    "events_url": { type: GraphQLString },
    "received_events_url": { type: GraphQLString },
    "type": { type: GraphQLString },
    "site_admin": { type: GraphQLBoolean },
    "users_following": usersFollowing(),
    "user_followers": userFollowers(),
  })
});

export const DetailedRepoInfoType = new GraphQLObjectType({
  name: "DetailedRepoInfo",
  description: "Detailed information on a GitHub repo",
  fields: () => ({
    "id": { type: GraphQLInt },
    "name": { type: GraphQLString },
    "full_name": { type: GraphQLString },
    "owner": { type: OwnerRepoInfoType},
    "private": { type: GraphQLBoolean },
    "html_url": { type: GraphQLString },
    "description": { type: GraphQLString },
    "fork": { type: GraphQLBoolean },
    "url": { type: GraphQLString },
    forks_url: { type: GraphQLString },
    keys_url: { type: GraphQLString },
    collaborators_url: { type: GraphQLString },
    teams_url: { type: GraphQLString },
    hooks_url: { type: GraphQLString },
    issue_events_url: { type: GraphQLString },
    events_url: { type: GraphQLString },
    assignees_url: { type: GraphQLString },
    branches_url: { type: GraphQLString },
    tags_url: { type: GraphQLString },
    blobs_url: { type: GraphQLString },
    git_tags_url: { type: GraphQLString },
    git_refs_url: { type: GraphQLString },
    trees_url: { type: GraphQLString },
    statuses_url: { type: GraphQLString },
    languages_url: { type: GraphQLString },
    stargazers_url: { type: GraphQLString },
    contributors_url: { type: GraphQLString },
    subscribers_url: { type: GraphQLString },
    subscription_url: { type: GraphQLString },
    commits_url: { type: GraphQLString },
    git_commits_url: { type: GraphQLString },
    comments_url: { type: GraphQLString },
    issue_comment_url: { type: GraphQLString },
    contents_url: { type: GraphQLString },
    compare_url: { type: GraphQLString },
    merges_url: { type: GraphQLString },
    archive_url: { type: GraphQLString },
    downloads_url: { type: GraphQLString },
    issues_url: { type: GraphQLString },
    pulls_url: { type: GraphQLString },
    milestones_url: { type: GraphQLString },
    notifications_url: { type: GraphQLString },
    labels_url: { type: GraphQLString },
    releases_url: { type: GraphQLString },
    deployments_url: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    pushed_at: { type: GraphQLString },
    git_url: { type: GraphQLString },
    ssh_url: { type: GraphQLString },
    clone_url: { type: GraphQLString },
    svn_url: { type: GraphQLString },
    homepage: { type: GraphQLString },
    size: { type: GraphQLInt },
    stargazers_count: { type: GraphQLInt },
    watchers_count: { type: GraphQLInt },
    language: { type: GraphQLString },
    has_issues: { type: GraphQLBoolean },
    has_downloads: { type: GraphQLBoolean },
    has_wiki: { type: GraphQLBoolean },
    has_pages: { type: GraphQLBoolean },
    forks_count: { type: GraphQLInt },
    mirror_url: { type: GraphQLString },
    open_issues_count: { type: GraphQLInt },
    forks: { type: GraphQLInt },
    open_issues: { type: GraphQLInt },
    watchers: { type: GraphQLInt },
    default_branch: { type: GraphQLString },
  })
});
