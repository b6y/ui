import { latinise } from "@b6y/commons";
import * as R from "ramda";
import React from "react";
import { injectIntl, IntlShape, MessageDescriptor, WrappedComponentProps } from "react-intl";

export interface OptionType {
  label: string | MessageDescriptor;
  value: any;
  option?: React.ReactNode;
}

export interface SearchableOptionType {
  text: string;
}

export abstract class Adapter {
  public abstract search(input: string, props: any): Promise<OptionType[]>;

  public abstract byIds(ids: number[], props: any): Promise<OptionType[]>;
}

export class ArrayAdapter extends Adapter {
  protected options: Array<OptionType & SearchableOptionType>;

  constructor(
    options: OptionType[],
  ) {
    super();

    this.options = options.map((o) => {
      if (!R.is(Object, o.label)) {
        const label = o.label as string;
        return { ...o, text: latinise(label) || label };
      } else {
        return { ...o, text: "NOT_TRANSLATED" };
      }
    });
  }

  public intl(intl: IntlShape) {
    const translatedOptions = this.options.map((o) => {
      if (!R.is(Object, o.label)) {
        const label = o.label as string;
        return { ...o, text: latinise(label) || label };
      } else {
        const label = intl.formatMessage(o.label as MessageDescriptor);
        return { ...o, label, text: latinise(label) || label };
      }
    });
    return new ArrayAdapter(translatedOptions);
  }

  public search(input: string, props: any): Promise<OptionType[]> {
    return new Promise((resolve) => {
      if (R.isNil(input) || input === "") {
        resolve(this.options);
      } else {
        const text = latinise(input) || input;
        resolve(
          this.options.filter((o) => o.text.includes(text)),
        );
      }
    });
  }

  public byIds(ids: number[], props: any): Promise<OptionType[]> {
    return new Promise((resolve) => {
      resolve(this.options.filter((o) => ids.indexOf(o.value) > -1) || null);
    });
  }
}
