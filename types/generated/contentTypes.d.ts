import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdministrativeInformationAdministrativeInformation
  extends Schema.CollectionType {
  collectionName: 'administrative_informations';
  info: {
    singularName: 'administrative-information';
    pluralName: 'administrative-informations';
    displayName: 'administrative_information';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    admission_date: Attribute.DateTime;
    discharge_date: Attribute.DateTime;
    referring_physician: Attribute.Relation<
      'api::administrative-information.administrative-information',
      'oneToOne',
      'api::doctor.doctor'
    >;
    visit_type: Attribute.String;
    appointment_histories: Attribute.Relation<
      'api::administrative-information.administrative-information',
      'oneToMany',
      'api::appointment-history.appointment-history'
    >;
    billing_informations: Attribute.Relation<
      'api::administrative-information.administrative-information',
      'oneToMany',
      'api::billing-information.billing-information'
    >;
    consent_forms: Attribute.Relation<
      'api::administrative-information.administrative-information',
      'oneToMany',
      'api::consent-form.consent-form'
    >;
    notes: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::administrative-information.administrative-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::administrative-information.administrative-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAllergyAllergy extends Schema.CollectionType {
  collectionName: 'allergies';
  info: {
    singularName: 'allergy';
    pluralName: 'allergies';
    displayName: 'allergy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    allergen: Attribute.String;
    reaction: Attribute.String;
    severity: Attribute.String;
    notes: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::allergy.allergy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::allergy.allergy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppointmentHistoryAppointmentHistory
  extends Schema.CollectionType {
  collectionName: 'appointment_histories';
  info: {
    singularName: 'appointment-history';
    pluralName: 'appointment-histories';
    displayName: 'appointment_history';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    appointment_date: Attribute.DateTime;
    doctor: Attribute.Relation<
      'api::appointment-history.appointment-history',
      'oneToOne',
      'api::doctor.doctor'
    >;
    reason: Attribute.Text;
    outcome: Attribute.Text;
    notes: Attribute.Text;
    administrative_information: Attribute.Relation<
      'api::appointment-history.appointment-history',
      'manyToOne',
      'api::administrative-information.administrative-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::appointment-history.appointment-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::appointment-history.appointment-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBillingInformationBillingInformation
  extends Schema.CollectionType {
  collectionName: 'billing_informations';
  info: {
    singularName: 'billing-information';
    pluralName: 'billing-informations';
    displayName: 'billing_information';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    service_date: Attribute.DateTime;
    service_description: Attribute.String;
    charges: Attribute.BigInteger;
    insurance_covered: Attribute.BigInteger;
    patient_responsibility: Attribute.BigInteger;
    payment_status: Attribute.String;
    notes: Attribute.Text;
    administrative_information: Attribute.Relation<
      'api::billing-information.billing-information',
      'manyToOne',
      'api::administrative-information.administrative-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::billing-information.billing-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::billing-information.billing-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsentFormConsentForm extends Schema.CollectionType {
  collectionName: 'consent_forms';
  info: {
    singularName: 'consent-form';
    pluralName: 'consent-forms';
    displayName: 'consent_form';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    form_type: Attribute.String;
    date_signed: Attribute.String;
    provider: Attribute.String;
    notes: Attribute.Text;
    administrative_information: Attribute.Relation<
      'api::consent-form.consent-form',
      'manyToOne',
      'api::administrative-information.administrative-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consent-form.consent-form',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consent-form.consent-form',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCurrentConditionCurrentCondition
  extends Schema.CollectionType {
  collectionName: 'current_conditions';
  info: {
    singularName: 'current-condition';
    pluralName: 'current-conditions';
    displayName: 'current_condition';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    condition: Attribute.String;
    diagnosed_date: Attribute.DateTime;
    treatment: Attribute.String;
    status: Attribute.String;
    notes: Attribute.Text;
    current_health_information: Attribute.Relation<
      'api::current-condition.current-condition',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::current-condition.current-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::current-condition.current-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCurrentHealthInformationCurrentHealthInformation
  extends Schema.CollectionType {
  collectionName: 'current_health_informations';
  info: {
    singularName: 'current-health-information';
    pluralName: 'current-health-informations';
    displayName: 'current_health_information';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    patient: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToOne',
      'api::patient.patient'
    >;
    symptoms: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::symptom.symptom'
    >;
    vitals: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::vital.vital'
    >;
    current_medications: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::current-medication.current-medication'
    >;
    primary_care_physician: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToOne',
      'api::primary-care-physician.primary-care-physician'
    >;
    current_conditions: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::current-condition.current-condition'
    >;
    encounters: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::encounter.encounter'
    >;
    lab_results: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::lab-result.lab-result'
    >;
    imaging_results: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::imaging-result.imaging-result'
    >;
    specialists: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToMany',
      'api::specialist.specialist'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::current-health-information.current-health-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCurrentMedicationCurrentMedication
  extends Schema.CollectionType {
  collectionName: 'current_medications';
  info: {
    singularName: 'current-medication';
    pluralName: 'current-medications';
    displayName: 'current_medication';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    dose: Attribute.String;
    frequency: Attribute.String;
    start_date: Attribute.String;
    prescribing_doctor: Attribute.String;
    notes: Attribute.String;
    current_health_information: Attribute.Relation<
      'api::current-medication.current-medication',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::current-medication.current-medication',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::current-medication.current-medication',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDoctorDoctor extends Schema.CollectionType {
  collectionName: 'doctors';
  info: {
    singularName: 'doctor';
    pluralName: 'doctors';
    displayName: 'doctor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    contact_information: Attribute.JSON;
    specialist: Attribute.Relation<
      'api::doctor.doctor',
      'manyToOne',
      'api::specialist.specialist'
    >;
    specialty: Attribute.String;
    encounters: Attribute.Relation<
      'api::doctor.doctor',
      'oneToMany',
      'api::encounter.encounter'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::doctor.doctor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::doctor.doctor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEncounterEncounter extends Schema.CollectionType {
  collectionName: 'encounters';
  info: {
    singularName: 'encounter';
    pluralName: 'encounters';
    displayName: 'encounter';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date: Attribute.DateTime;
    provider: Attribute.Relation<
      'api::encounter.encounter',
      'manyToOne',
      'api::doctor.doctor'
    >;
    reason: Attribute.Text;
    notes: Attribute.Text;
    current_health_information: Attribute.Relation<
      'api::encounter.encounter',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::encounter.encounter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::encounter.encounter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFamilyMedicalHistoryFamilyMedicalHistory
  extends Schema.CollectionType {
  collectionName: 'family_medical_histories';
  info: {
    singularName: 'family-medical-history';
    pluralName: 'family-medical-histories';
    displayName: 'family_medical_history';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    relative: Attribute.String;
    condition: Attribute.String;
    age_diagnosed: Attribute.String;
    current_status: Attribute.String;
    notes: Attribute.Text;
    medical_history: Attribute.Relation<
      'api::family-medical-history.family-medical-history',
      'manyToOne',
      'api::medical-history.medical-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::family-medical-history.family-medical-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::family-medical-history.family-medical-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImagingResultImagingResult extends Schema.CollectionType {
  collectionName: 'imaging_results';
  info: {
    singularName: 'imaging-result';
    pluralName: 'imaging-results';
    displayName: 'imaging_result';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    test: Attribute.String;
    date: Attribute.DateTime;
    result: Attribute.String;
    notes: Attribute.Text;
    current_health_information: Attribute.Relation<
      'api::imaging-result.imaging-result',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::imaging-result.imaging-result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::imaging-result.imaging-result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImmunizationImmunization extends Schema.CollectionType {
  collectionName: 'immunizations';
  info: {
    singularName: 'immunization';
    pluralName: 'immunizations';
    displayName: 'immunization';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vaccine: Attribute.String;
    date: Attribute.DateTime;
    provider: Attribute.String;
    lot_number: Attribute.String;
    notes: Attribute.Text;
    medical_history: Attribute.Relation<
      'api::immunization.immunization',
      'manyToOne',
      'api::medical-history.medical-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::immunization.immunization',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::immunization.immunization',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLabResultLabResult extends Schema.CollectionType {
  collectionName: 'lab_results';
  info: {
    singularName: 'lab-result';
    pluralName: 'lab-results';
    displayName: 'lab_result';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    test: Attribute.String;
    date: Attribute.DateTime;
    result: Attribute.String;
    normal_range: Attribute.String;
    notes: Attribute.Text;
    current_health_information: Attribute.Relation<
      'api::lab-result.lab-result',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    assets: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lab-result.lab-result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::lab-result.lab-result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMedicalHistoryMedicalHistory extends Schema.CollectionType {
  collectionName: 'medical_histories';
  info: {
    singularName: 'medical-history';
    pluralName: 'medical-histories';
    displayName: 'medical_history';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    patient: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToOne',
      'api::patient.patient'
    >;
    surgical_histories: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToMany',
      'api::surgical-history.surgical-history'
    >;
    immunizations: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToMany',
      'api::immunization.immunization'
    >;
    medications: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToMany',
      'api::medication.medication'
    >;
    family_medical_histories: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToMany',
      'api::family-medical-history.family-medical-history'
    >;
    social_histories: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToMany',
      'api::social-history.social-history'
    >;
    past_medical_conditions: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToMany',
      'api::past-medical-condition.past-medical-condition'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::medical-history.medical-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMedicationMedication extends Schema.CollectionType {
  collectionName: 'medications';
  info: {
    singularName: 'medication';
    pluralName: 'medications';
    displayName: 'medication';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    dose: Attribute.String;
    frequency: Attribute.String;
    start_date: Attribute.String;
    end_date: Attribute.String;
    prescribing_doctor: Attribute.String;
    notes: Attribute.Text;
    medical_history: Attribute.Relation<
      'api::medication.medication',
      'manyToOne',
      'api::medical-history.medical-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::medication.medication',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::medication.medication',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPastMedicalConditionPastMedicalCondition
  extends Schema.CollectionType {
  collectionName: 'past_medical_conditions';
  info: {
    singularName: 'past-medical-condition';
    pluralName: 'past-medical-conditions';
    displayName: 'past_medical_condition';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    condition: Attribute.String;
    diagnosed_date: Attribute.DateTime;
    treatment: Attribute.String;
    status: Attribute.String;
    notes: Attribute.Text;
    medical_history: Attribute.Relation<
      'api::past-medical-condition.past-medical-condition',
      'manyToOne',
      'api::medical-history.medical-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::past-medical-condition.past-medical-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::past-medical-condition.past-medical-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPatientPatient extends Schema.CollectionType {
  collectionName: 'patients';
  info: {
    singularName: 'patient';
    pluralName: 'patients';
    displayName: 'Patient';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    middle_name: Attribute.String;
    date_of_birth: Attribute.String;
    gender: Attribute.Enumeration<['MALE', 'FEMALE', 'OTHERS']>;
    address: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    zip_code: Attribute.String;
    country: Attribute.String;
    province: Attribute.String;
    phone_number: Attribute.String;
    email: Attribute.String;
    emergency_contact_name: Attribute.String;
    emergency_contact_relationship: Attribute.String;
    emergency_contact_phone_number: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::patient.patient',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::patient.patient',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPrimaryCarePhysicianPrimaryCarePhysician
  extends Schema.CollectionType {
  collectionName: 'primary_care_physicians';
  info: {
    singularName: 'primary-care-physician';
    pluralName: 'primary-care-physicians';
    displayName: 'primary_care_physician';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    doctor: Attribute.Relation<
      'api::primary-care-physician.primary-care-physician',
      'oneToOne',
      'api::doctor.doctor'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::primary-care-physician.primary-care-physician',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::primary-care-physician.primary-care-physician',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSocialHistorySocialHistory extends Schema.CollectionType {
  collectionName: 'social_histories';
  info: {
    singularName: 'social-history';
    pluralName: 'social-histories';
    displayName: 'social_history';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    smoking_status: Attribute.String;
    alcohol_use: Attribute.String;
    drug_use: Attribute.String;
    occupation: Attribute.String;
    exercise_frequency: Attribute.String;
    dietary_habits: Attribute.String;
    living_situation: Attribute.String;
    notes: Attribute.Text;
    medical_history: Attribute.Relation<
      'api::social-history.social-history',
      'manyToOne',
      'api::medical-history.medical-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::social-history.social-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::social-history.social-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSpecialistSpecialist extends Schema.CollectionType {
  collectionName: 'specialists';
  info: {
    singularName: 'specialist';
    pluralName: 'specialists';
    displayName: 'specialist';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    doctors: Attribute.Relation<
      'api::specialist.specialist',
      'oneToMany',
      'api::doctor.doctor'
    >;
    current_health_information: Attribute.Relation<
      'api::specialist.specialist',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::specialist.specialist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::specialist.specialist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSurgicalHistorySurgicalHistory
  extends Schema.CollectionType {
  collectionName: 'surgical_histories';
  info: {
    singularName: 'surgical-history';
    pluralName: 'surgical-histories';
    displayName: 'surgical_history';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    procedure: Attribute.String;
    date: Attribute.DateTime;
    surgeon: Attribute.String;
    hospital: Attribute.String;
    outcome: Attribute.String;
    notes: Attribute.Text;
    medical_history: Attribute.Relation<
      'api::surgical-history.surgical-history',
      'manyToOne',
      'api::medical-history.medical-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::surgical-history.surgical-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::surgical-history.surgical-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSymptomSymptom extends Schema.CollectionType {
  collectionName: 'symptoms';
  info: {
    singularName: 'symptom';
    pluralName: 'symptoms';
    displayName: 'symptom';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    symptom: Attribute.String;
    description: Attribute.String;
    duration: Attribute.String;
    severity: Attribute.String;
    notes: Attribute.Text;
    current_health_information: Attribute.Relation<
      'api::symptom.symptom',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::symptom.symptom',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::symptom.symptom',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVitalVital extends Schema.CollectionType {
  collectionName: 'vitals';
  info: {
    singularName: 'vital';
    pluralName: 'vitals';
    displayName: 'vital';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blood_pressure: Attribute.String;
    heart_rate: Attribute.String;
    temperature: Attribute.String;
    respiratory_rate: Attribute.String;
    oxygen_saturation: Attribute.String;
    current_health_information: Attribute.Relation<
      'api::vital.vital',
      'manyToOne',
      'api::current-health-information.current-health-information'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vital.vital',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vital.vital',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::administrative-information.administrative-information': ApiAdministrativeInformationAdministrativeInformation;
      'api::allergy.allergy': ApiAllergyAllergy;
      'api::appointment-history.appointment-history': ApiAppointmentHistoryAppointmentHistory;
      'api::billing-information.billing-information': ApiBillingInformationBillingInformation;
      'api::consent-form.consent-form': ApiConsentFormConsentForm;
      'api::current-condition.current-condition': ApiCurrentConditionCurrentCondition;
      'api::current-health-information.current-health-information': ApiCurrentHealthInformationCurrentHealthInformation;
      'api::current-medication.current-medication': ApiCurrentMedicationCurrentMedication;
      'api::doctor.doctor': ApiDoctorDoctor;
      'api::encounter.encounter': ApiEncounterEncounter;
      'api::family-medical-history.family-medical-history': ApiFamilyMedicalHistoryFamilyMedicalHistory;
      'api::imaging-result.imaging-result': ApiImagingResultImagingResult;
      'api::immunization.immunization': ApiImmunizationImmunization;
      'api::lab-result.lab-result': ApiLabResultLabResult;
      'api::medical-history.medical-history': ApiMedicalHistoryMedicalHistory;
      'api::medication.medication': ApiMedicationMedication;
      'api::past-medical-condition.past-medical-condition': ApiPastMedicalConditionPastMedicalCondition;
      'api::patient.patient': ApiPatientPatient;
      'api::primary-care-physician.primary-care-physician': ApiPrimaryCarePhysicianPrimaryCarePhysician;
      'api::social-history.social-history': ApiSocialHistorySocialHistory;
      'api::specialist.specialist': ApiSpecialistSpecialist;
      'api::surgical-history.surgical-history': ApiSurgicalHistorySurgicalHistory;
      'api::symptom.symptom': ApiSymptomSymptom;
      'api::vital.vital': ApiVitalVital;
    }
  }
}
