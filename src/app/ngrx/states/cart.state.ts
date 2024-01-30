import { Cart } from '../../models/cart.model';

export interface CartState {
  cart: Cart;
  isGetting: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;

  isDeleting: boolean;
  isDeleteSuccess: boolean;
  deleteErrorMessage: string;

  isCreating: boolean;
  isCreateSuccess: boolean;
  createErrorMessage: string;

  isAdding: boolean;
  isAddSuccess: boolean;
  addErrorMessage: string;
}
