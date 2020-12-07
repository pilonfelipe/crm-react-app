import { AbilityBuilder } from '@casl/ability';

export default (ability, user) => {
    const { can, cannot, rules } = new AbilityBuilder();

    if (!user.authenticated) 
    {
        cannot('manage', 'all');
}
    else if (user.role === 'admin') 
    {
        can('manage', 'all');
    }
    else if (user.role === 'manager') 
    {
        can('read', 'Customers');
        can('read', 'Stores');
        can('read', 'StoreGroups');
        can('read', 'ContactReasons');
        can('read', 'SalesPanel');
    }
    else if (user.role === 'salesman') 
    {
        can('read', 'Agenda');
        can('read', 'Reserves');
    }

    ability.update(rules);
};