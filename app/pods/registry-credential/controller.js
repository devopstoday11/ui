import Cattle from 'ui/utils/cattle';

var RegistryController = Cattle.TransitioningResourceController.extend({
  actions: {
    deactivate: function() {
      return this.doAction('deactivate');
    },

    activate: function() {
      return this.doAction('activate');
    },

    restore: function() {
      return this.doAction('restore');
    },

    purge: function() {
      return this.doAction('purge');
    },

    edit: function() {
      this.transitionToRoute('registryCredential.edit',this.get('id'));
    },

    promptDelete: function() {
      this.transitionToRoute('registryCredential.delete',this.get('id'));
    },

    delete: function() {
      return this.delete();
    }
  },

  availableActions: function() {
    var a = this.get('actions');

    return [
      { label: 'Activate',      icon: 'ss-play',  action: 'activate',     enabled: !!a.activate },
      { label: 'Deactivate',    icon: 'ss-pause', action: 'deactivate',   enabled: !!a.deactivate },
      { label: 'Delete',        icon: 'ss-trash', action: 'promptDelete', enabled: !!a.remove, altAction: 'delete' },
      { divider: true },
      { label: 'Restore',       icon: '',         action: 'restore',      enabled: !!a.restore },
      { label: 'Purge',         icon: '',         action: 'purge',        enabled: !!a.purge },
//      { divider: true },
//      { label: 'Edit',          icon: 'ss-write',         action: 'edit',         enabled: !!a.update },
    ];
  }.property('actions.{update,activate,deactivate,restore,remove,purge}'),
});

RegistryController.reopenClass({
  stateMap: {
    'active':     {icon: 'ss-record',     color: 'text-success'},
    'inactive':   {icon: 'fa fa-circle',  color: 'text-muted'},
    'purged':     {icon: 'ss-tornado',    color: 'text-danger'},
    'removed':    {icon: 'ss-trash',      color: 'text-danger'},
    'requested':  {icon: 'ss-tag',        color: 'text-info'},
  }
});

export default RegistryController;
