import { preload, toQueue } from './helpers';
import pipe from 'ramda/es/pipe';
import { analytics } from '../utils/analytics';
import then from 'ramda/es/then';
import prop from 'ramda/es/prop';
import tap from 'ramda/es/tap';
import applySpec from 'ramda/es/applySpec';
import nthArg from 'ramda/es/nthArg';
import { libs } from '@waves/waves-transactions';
import loginRoute from '../router/login';
import { IState } from '../interface';
import { IUserData } from '@waves/signer';
import { Queue } from '../../utils/Queue';

export const getLoginHandler = (
    queue: Queue,
    state: IState
): (() => Promise<IUserData>) =>
    toQueue(queue, () => {
        preload();

        return loginRoute(state)().then((user) => {
            analytics.addDefaultParams({
                auuid: pipe(
                    libs.crypto.stringToBytes,
                    libs.crypto.blake2b,
                    libs.crypto.base64Encode
                )(user.address, undefined),
            });

            return user;
        });
    });
