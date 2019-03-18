import * as vscode from 'vscode';
import { IssueItem } from '../explorer/item/issue-item';
import { gitIntegration, selectValues, utilities } from '../services';
import { SEARCH_MODE } from '../shared/constants';
import changeIssueAssignee from './change-issue-assignee';
import changeIssueStatus from './change-issue-status';
import createIssue from './create-issue';
import favouritesFilters from './favourites-filters';
import issueAddComment from './issue-add-comment';
import issueAddWorklog from './issue-add-worklog';
import openGitHubRepo from './open-github-repo';
import openIssue from './open-issue';
import setWorkingIssue from './set-working-issue';
import setWorkingProject from './set-working-project';
import setupCredentials from './setup-credentials';

const { registerCommand } = vscode.commands;
const issueSelector = (mode: string) => () => selectValues.selectIssue(mode);

export default {
  /**
   * Registers all plugin related commands
   *
   * @returns {vscode.Disposable[]}
   */
  register(): vscode.Disposable[] {
    return [
      // initial setup
      registerCommand('jira-plugin.setupCredentials', setupCredentials),

      // working project / issue
      registerCommand('jira-plugin.setWorkingProject', setWorkingProject),
      registerCommand('jira-plugin.setWorkingIssue', setWorkingIssue),
      registerCommand('jira-plugin.insertWorkingIssueComment', utilities.insertWorkingIssueComment),
      registerCommand('jira-plugin.issueAddWorklog', issueAddWorklog),

      // explorer header
      registerCommand('jira-plugin.createIssue', createIssue),

      // explorer group by
      registerCommand('jira-plugin.changeExplorerGroupBy', selectValues.changeExplorerGroupBy),

      // explorer filters
      registerCommand('jira-plugin.refresh', issueSelector(SEARCH_MODE.REFRESH)),
      registerCommand('jira-plugin.defaultIssues', issueSelector(SEARCH_MODE.DEFAULT)),
      registerCommand('jira-plugin.allIssues', issueSelector(SEARCH_MODE.ALL)),
      registerCommand('jira-plugin.currentSprint', issueSelector(SEARCH_MODE.CURRENT_SPRINT)),
      registerCommand('jira-plugin.myIssuesByStatus', issueSelector(SEARCH_MODE.MY_STATUS)),
      registerCommand('jira-plugin.issuesByStatusAssignee', issueSelector(SEARCH_MODE.STATUS_ASSIGNEE)),
      registerCommand('jira-plugin.issuesByStatus', issueSelector(SEARCH_MODE.STATUS)),
      registerCommand('jira-plugin.issueById', issueSelector(SEARCH_MODE.ID)),
      registerCommand('jira-plugin.issuesBySummary', issueSelector(SEARCH_MODE.SUMMARY)),
      registerCommand('jira-plugin.favouritesFilters', favouritesFilters),

      // explorer issue
      registerCommand('jira-plugin.changeIssueStatus', changeIssueStatus),
      registerCommand('jira-plugin.changeIssueAssignee', changeIssueAssignee),
      registerCommand('jira-plugin.issueAddComment', (issue: IssueItem) => issueAddComment(issue, false)),
      registerCommand('jira-plugin.issueAddInternalComment', (issue: IssueItem) => issueAddComment(issue, true)),
      registerCommand('jira-plugin.openIssue', openIssue),
      registerCommand('jira-plugin.copyJiraSummary', utilities.copyToClipboard),

      // auxilary commands
      registerCommand('jira-plugin.openGitHubRepo', openGitHubRepo),

      // git integration commands
      registerCommand('jira-plugin.checkoutGitBranch', gitIntegration.invokeCheckoutBranch)
    ];
  }
};
